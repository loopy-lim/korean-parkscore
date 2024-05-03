import { useEffect, useRef } from "react";
import { useScore } from "../../stores/scores";
import * as d3 from "d3";
import { scoreColors } from "../../constants/color";
import { maxListRow } from "../../constants/scores";
import { getKeys, getValues } from "../../functions/utils";

const lineHight = 30;
const drawHeight = 15;
const leftPadding = 8 * 16;

export const ScoreList = () => {
  const scores = useScore((state) => state.scores);
  const realScorePercent = useScore((state) => state.realScorePercent);
  const wapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chart = d3
      .select(wapperRef.current)
      .append("svg")
      .attr("width", wapperRef.current?.clientWidth || 0)
      .attr("height", Math.min(scores.length, maxListRow) * lineHight)
      .attr("viewBox", [
        0,
        0,
        wapperRef.current?.clientWidth || 0,
        Math.min(scores.length, maxListRow) * lineHight,
      ])
      .attr("style", "max-width:100%; height:auto;");

    const scoreKeys = getKeys(scores[0].score);

    chart
      .append("g")
      .selectAll("g")
      .data(scores)
      .enter()
      .append("g")
      .attr("fill", (_, i) => scoreColors[scoreKeys[i]]) //  row
      .selectAll("rect")
      .data((d) => getValues(d.score))
      .enter()
      .append("rect")
      .attr("x", leftPadding)
      .attr("y", (_, i) => i * lineHight)
      .attr("height", drawHeight)
      .attr("width", (d) => d)
      .attr("fill", (_, i) => scoreColors[scoreKeys[i]]);

    return () => {
      chart.remove();
    };
  }, []);

  return <div ref={wapperRef}></div>;
};
