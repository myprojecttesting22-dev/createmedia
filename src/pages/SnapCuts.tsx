import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SnapCutsForm from "@/components/SnapCutsForm";

const SnapCuts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SnapCutsForm />
      <Footer />
    </div>
  );
};

export default SnapCuts;
