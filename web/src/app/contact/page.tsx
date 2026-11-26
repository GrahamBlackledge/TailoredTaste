import EnquiryForm from "@/components/EnquiryForm";

export default function ContactPage() {
  return (
    <main className="public-page mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-4 text-4xl font-bold"> Make an enquiry</h1>

        <p className="mb-8 text-lg text-gray-700"> 
            Planning a private dining event?
        Complete the form below and we'll be in touch
        to discuss your requirements.</p>



        <EnquiryForm />
    </main>
  );
}


