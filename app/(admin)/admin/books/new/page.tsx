import NavBreadcrumb from "@/components/share/admin/nav-breadcrumb";
import NewBookForm from "@/feature/admin/book/componenets/new-book-form";

const NewBookPage = () => {
    return (
        <>
            <NavBreadcrumb />
            <section className={"mt-8 w-full max-w-2xl mx-auto"}>
                <NewBookForm />
            </section>
        </>
    );
};

export default NewBookPage;
