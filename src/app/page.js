
import ProductListing from "./components/ProductListing";
// Assuming your existing imports are here

export default function Home() {

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between lg:p-8 xl:p-16">
     <ProductListing/>
    </main>
  );
}

