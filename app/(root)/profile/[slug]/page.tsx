const ProfilePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    return <section className={"w-screen"}>userid: {slug}</section>;
};

export default ProfilePage;
