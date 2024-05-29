import type { ScoreWithCity } from "../../dtos/score";
import { nth } from "../../functions/utils";
import { CitySearch } from "./CitySearch";

const description = `아래의 검색창을 통해 지역의 순위와 접근, 면적, 투자, 공평, 시설 지표의 점수를 확인할 수 있습니다`;

interface CityDescriptionProps {
  selectedCityScore: ScoreWithCity;
  rank: number;
}

export const CityDescription = ({
  selectedCityScore,
  rank,
}: CityDescriptionProps) => {
  return (
    <div className="flex gap-4 items-center">
      <img
        className="min-w-36 min-h-36 rounded-2xl w-36 h-36"
        src={`/public/city-logo/${selectedCityScore.city}.png`}
        alt={`${selectedCityScore.city} 로고`}
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-400">CITY</h2>
            <h3 className="text-2xl font-extrabold">
              {selectedCityScore.city}
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-400">RANKING</h2>
            <h3 className="font-extrabold flex justify-start">
              <span className="text-3xl">{+rank + 1}</span>
              <span className="text-xl">{nth(+rank + 1)}</span>
            </h3>
          </div>
        </div>
        <div className="text-lg py-4">{description}</div>
        <CitySearch />
      </div>
    </div>
  );
};
