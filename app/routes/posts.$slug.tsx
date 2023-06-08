import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSinglePost } from "~/models/posts.server";

type LoaderData = {
    post: Awaited<ReturnType<typeof getSinglePost>>,
    err: {
        msg: string,
    }
}

export const loader: LoaderFunction = async ({ params }) => {
    const { slug } = params;

    if (!slug) {
        return {
            err: {
                msg: "A slug is required."
            }
        }
    }

    const post = await getSinglePost(slug);

    if (!post?.slug) {
        return {
            err: {
                msg: "Sorry, that post doesn't exist."
            }
        }
    }

    return json({ post: post ?? {} });
}

export default function PostRoute() {
    const { post, err } = useLoaderData() as LoaderData;

    if (err) {
        return <p>{err.msg}</p>
    }

    return (
        <main className="mx-auto max-w-4x1">
            <h1 className="my-6 border-b-2 text-center text-3x1">
                {post?.title}
            </h1>
        </main>
    )
}