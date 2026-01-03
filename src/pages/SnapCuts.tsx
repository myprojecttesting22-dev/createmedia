import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SnapCutsLanding from "@/components/SnapCutsLanding";
import SnapCutsForm from "@/components/SnapCutsForm";

const SnapCuts = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SnapCutsLanding onJoinClick={() => setShowForm(true)} />
      <Footer />
      
      {/* Form Modal */}
      {showForm && (
        <SnapCutsForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default SnapCuts;
