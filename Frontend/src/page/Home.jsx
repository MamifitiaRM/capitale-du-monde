import { CategoryCard, MainView } from "#components";
import { categories } from "#data";
import { getContinentPoints } from "#lib/progress";
import useUserStore from "#store/useUserStore";

const Home = () => {
  const { user } = useUserStore();

  return (
    <MainView>
      <div className="space-y-6 text-center">
        <h2 className="md:py-4">
          Bonjour {user.name}, par quoi voulez-vous commencer ?
        </h2>
        <p className="text-lg text-gray-500">
          Total : <b className="text-primary-dark">{user.totalPoint} pts</b>
        </p>
        <div className="grid gap-5 md:grid-cols-2 md:gap-x-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.continent}
              {...category}
              points={getContinentPoints(user, category.continent)}
            />
          ))}
        </div>
      </div>
    </MainView>
  );
};

export default Home;
