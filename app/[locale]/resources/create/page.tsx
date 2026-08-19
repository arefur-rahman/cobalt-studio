import CreateArticleClient from "./CreateArticleClient";

export async function generateMetadata() {
    return {
        title: "Post New Article | Cobalt Studio",
        description:
            "Article Creation Studio reserved for Cobalt Studio administrators.",
    };
}

export default function CreateArticlePage() {
    return <CreateArticleClient />;
}
