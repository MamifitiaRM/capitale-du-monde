import { useEffect } from "react";
import { Loader, Trophy } from "lucide-react";
import { MainView } from "#components";
import useLeaderboardStore from "#store/useLeaderboardStore";
import useUserStore from "#store/useUserStore";

const podium = ["text-amber-500", "text-gray-400", "text-orange-700"];

const Leaderboard = () => {
  const { user } = useUserStore();
  const { leaderboard, me, loading, getLeaderboard } = useLeaderboardStore();

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  const isInList = leaderboard.some((item) => item.id === user._id);

  return (
    <MainView>
      <div className="space-y-6">
        <h2 className="text-center md:py-4">Classement</h2>
        {loading ? (
          <Loader className="mx-auto animate-spin" size={32} />
        ) : (
          <>
            {leaderboard.length === 0 ? (
              <p className="card px-4 py-8 text-center">
                Personne n'est encore classé. Jouez une partie pour ouvrir le
                classement !
              </p>
            ) : (
              <ol className="card divide-y divide-gray-100 overflow-hidden">
                {leaderboard.map((item) => (
                  <li
                    key={item.id}
                    className={`flex items-center gap-3 px-4 py-3 md:px-8 ${
                      item.id === user._id ? "bg-emerald-50 font-semibold" : ""
                    }`}
                  >
                    <span className="flex w-8 justify-center">
                      {item.rank <= 3 ? (
                        <Trophy className={podium[item.rank - 1]} size={26} />
                      ) : (
                        item.rank
                      )}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{item.name}</span>
                    <span className="text-primary-dark">
                      {item.totalPoint} pts
                    </span>
                  </li>
                ))}
              </ol>
            )}
            {me && !isInList && (
              <p className="text-center text-gray-500">
                Votre position : <b>{me.rank}</b> avec{" "}
                <b>{me.totalPoint} pts</b>
              </p>
            )}
          </>
        )}
      </div>
    </MainView>
  );
};

export default Leaderboard;
