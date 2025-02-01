const Page = () => {
    return (
        <main>
            <section
                className={
                    "min-h-screen bg-pattern bg-cover bg-top bg-dark-100"
                }
            >
                <div
                    className={
                        "min-h-[80vh] max-w-7xl px-5 mx-auto flex flex-col justify-center items-center md:px-10"
                    }
                >
                    <h1
                        className={
                            "font-bebas-neue text-5xl font-bold text-light-100"
                        }
                    >
                        Whoa, Slow Down There, Speedy!
                    </h1>
                    <p className={"mt-3 max-w-xl text-center text-light-400"}>
                        Looks like you&apos;ve been a little eager. We&apos;ve
                        put a temporary pause on your excitement. Chill for a
                        little bit, and try again.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Page;
