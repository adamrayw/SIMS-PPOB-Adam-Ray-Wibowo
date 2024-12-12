import LayananCard from "./LayananCard";
import PromoCard from "./PromoCard";

const Dashboard = () => {
  return (
    <div className="space-y-20 pt-10">
      <section>
        <LayananCard />
      </section>
      <section>
        <PromoCard />
      </section>
    </div>
  );
};

export default Dashboard;
