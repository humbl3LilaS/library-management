import BookList from "@/components/share/book-list";
import { SAMPLE_BOOKS } from "@/constants/placeholder";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

const ProfilePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    console.log(slug);
    return (
        <>
            <BookList title={"Borrowed Book"} books={SAMPLE_BOOKS} />
            <Button
                className={"min-w-32 mt-8 bg-red-600 text-white"}
                onClick={async () => {
                    "use server";
                    await signOut({ redirect: true, redirectTo: "/" });
                }}
            >
                Logout
            </Button>
        </>
    );
};

export default ProfilePage;
