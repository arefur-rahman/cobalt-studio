import { notFound } from "next/navigation";
import { getArticleBySlug } from "../../articles";
import EditArticleClient from "./EditArticleClient";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return {
            title: "Article Not Found | Cobalt Studio",
        };
    }

    return {
        title: `Edit ${article.title} | Cobalt Studio`,
        description: `Edit article details for ${article.title}`,
    };
}

export default async function EditArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    return <EditArticleClient article={article} />;
}
