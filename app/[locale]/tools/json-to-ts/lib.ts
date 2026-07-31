// ---------- JSON -> TypeScript generation (pure utilities) ----------

export function toPascalCase(key: string): string {
    return (
        key
            .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase())
            .replace(/^./, (chr) => chr.toUpperCase())
            .replace(/[^a-zA-Z0-9]/g, "") || "Field"
    );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function mergeObjectsIntoInterface(
    items: Record<string, unknown>[],
    nameHint: string,
    interfaces: Map<string, string>,
): string {
    const typeName = toPascalCase(nameHint);

    const orderedKeys = items.reduce<string[]>((keys, item) => {
        const newKeys = Object.keys(item).filter((k) => !keys.includes(k));
        return [...keys, ...newKeys];
    }, []);

    const fields = orderedKeys
        .map((key) => {
            const itemsWithKey = items.filter((item) =>
                Object.prototype.hasOwnProperty.call(item, key),
            );
            const isOptional = itemsWithKey.length < items.length;

            const fieldTypes = Array.from(
                new Set(
                    itemsWithKey.map((item) =>
                        walk(item[key], key, interfaces),
                    ),
                ),
            );
            const fieldType =
                fieldTypes.length === 1
                    ? fieldTypes[0]
                    : `(${fieldTypes.join(" | ")})`;

            return `  ${key}${isOptional ? "?" : ""}: ${fieldType};`;
        })
        .join("\n");

    const body = `interface ${typeName} {\n${fields || "  // empty object"}\n}`;
    interfaces.set(typeName, body);

    return typeName;
}

function primitiveType(value: unknown): string {
    if (value === null) return "null";
    switch (typeof value) {
        case "string":
            return "string";
        case "number":
            return "number";
        case "boolean":
            return "boolean";
        default:
            return "unknown";
    }
}

// Walks a JSON value, collecting named interfaces along the way.
// Returns the TS type reference to use at the call-site.
function walk(
    value: unknown,
    nameHint: string,
    interfaces: Map<string, string>,
): string {
    if (Array.isArray(value)) {
        if (value.length === 0) return "unknown[]";

        const allObjects = value.every((item) => isPlainObject(item));

        if (allObjects) {
            const typeName = mergeObjectsIntoInterface(
                value as Record<string, unknown>[],
                nameHint,
                interfaces,
            );
            return `${typeName}[]`;
        }

        const elementTypes = Array.from(
            new Set(value.map((item) => walk(item, nameHint, interfaces))),
        );
        const elementType =
            elementTypes.length === 1
                ? elementTypes[0]
                : `(${elementTypes.join(" | ")})`;
        return `${elementType}[]`;
    }

    if (value !== null && typeof value === "object") {
        const typeName = toPascalCase(nameHint);
        const entries = Object.entries(value as Record<string, unknown>);

        const fields = entries
            .map(([key, val]) => {
                const isOptional = val === undefined;
                const fieldType = walk(val, key, interfaces);
                return `  ${key}${isOptional ? "?" : ""}: ${fieldType};`;
            })
            .join("\n");

        const body = `interface ${typeName} {\n${fields || "  // empty object"}\n}`;

        // avoid overwriting a different shape that happens to share a name
        if (!interfaces.has(typeName)) {
            interfaces.set(typeName, body);
        }
        return typeName;
    }

    return primitiveType(value);
}

export function generateTypeScript(jsonText: string, rootName: string): string {
    const parsed = JSON.parse(jsonText) as unknown;
    const interfaces = new Map<string, string>();
    const rootType = walk(parsed, rootName, interfaces);

    const blocks = Array.from(interfaces.values());

    // if the root itself wasn't an object (e.g. raw array/primitive), add a type alias
    const rootInterfaceName = toPascalCase(rootName);
    if (rootType !== rootInterfaceName) {
        blocks.push(`type Root = ${rootType};`);
    }

    return blocks.join("\n\n");
}
