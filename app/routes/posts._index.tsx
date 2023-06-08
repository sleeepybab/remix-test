import { LoaderFunction, Response, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPostListings, getPosts } from "~/models/posts.server";

type LoaderData = {
    posts: Awaited<ReturnType<typeof getPostListings>>,
}

export const loader: LoaderFunction = async () => {
    const posts = await getPostListings(); 

    return json<LoaderData>({ posts });
}

export default function PostRoute() {
    const { posts } = useLoaderData() as LoaderData;

    return (
        <main>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.slug}>
                        <Link to={post.slug} className="text-blue-600 underline">
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}