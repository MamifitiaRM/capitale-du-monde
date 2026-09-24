import { useEffect } from "react";
import { MainView } from "#components";
import { continentLabels, levelLabels, levelOrder } from "#data";
import { getBest } from "#lib/progress";
import useLeaderboardStore from "#store/useLeaderboardStore";
import useUserStore from "#store/useUserStore";

const Account = () => {
  const { user } = useUserStore();
  const { me, getLeaderboard } = useLeaderboardStore();

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  return (
    <MainView>
      <div className="space-y-6">
        <h2 className="text-center md:py-4">Mon compte</h2>

        <div className="card grid gap-4 px-4 py-6 text-center sm:grid-cols-3 md:px-8">
          <div className="min-w-0">
            <div className="text-sm text-gray-500">Nom</div>
            <div className="truncate font-semibold">{user.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Total</div>
            <div className="font-semibold text-primary-dark">
              {user.totalPoint} pts
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Classement</div>
            <div className="font-semibold">
              {me && user.totalPoint > 0 ? `${me.rank}e` : "Non classé"}
            </div>
          </div>
        </div>

        <div className="card overflow-x-auto p-4 md:p-6">
          <table className="w-full min-w-md text-center">
            <caption className="pb-3 text-left font-semibold">
              Meilleurs scores
            </caption>
            <thead>
              <tr className="text-sm text-gray-500">
                <th scope="col" className="pb-2 text-left font-normal">
                  Continent
                </th>
                {levelOrder.map((level) => (
                  <th key={level} scope="col" className="pb-2 font-normal">
                    {levelLabels[level]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Object.entries(continentLabels).map(([continent, label]) => (
                <tr key={continent}>
                  <th scope="row" className="py-2 text-left font-medium">
                    {label}
                  </th>
                  {levelOrder.map((level) => {
                    const best = getBest(user, continent, level);
                    return (
                      <td
                        key={level}
                        className={best ? "text-primary-dark" : "text-gray-400"}
                      >
                        {best ? `${best} pts` : "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainView>
  );
};

export default Account;
