"use client";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import useAppStore from "../UseAppStore";
import { APIURL } from "../Constants";
import { useRouter } from "next/router";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Dashboard = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   if (!loggedIn) router.push("/");
  // }, []);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyA5Cew4ozSJTEh34fzwt5TG3NLQBF9djDY"
  );
  const [emotionsData, setEmotionsData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedYearRange, setSelectedYearRange] = useState("fullYear");
  const [resp, setResponse] = useState("");
  const [loggedIn, user_id, username, password] = useAppStore((s) => [
    s.loggedIn,
    s.userId,
    s.username,
    s.password,
  ]);

    function formatResponse(text: string) {
      // Replace '****' with bold text and '***' with italic text
      const formattedText = text
        .replace(/\*\*\*\*/g, "<strong>") // Replace '****' with opening bold tag
        .replace(/\*\*\*/g, "<em>") // Replace '***' with opening italic tag
        .replace(/\*\*/g, "</strong>") // Replace '**' with closing bold tag
        .replace(/\*/g, "</em>") // Replace '*' with closing italic tag
        .replace(/\n/g, "<br>"); // Replace newline characters with <br> tags

      return formattedText;
    }

  const handleGenAi = async (emotionData: string, duration: string) => {
    // Handle sending input value
    // setLoading(true);
    try {
      const emotionDataString = JSON.stringify(emotionData);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `This has been my emotion lately ${emotionDataString} over the duration ${duration} please suggest me some good color and hex color for the lighting and also give me some good music suggestions `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      const formattedText = formatResponse(text);
      console.log(formattedText);
      setResponse(formattedText);
    } catch (error) {
      console.error("Error:", error);
      return "Something went wrong. Please try again.";
    } finally {
      // setLoading(false);
    }
  };

  const transformDataForPieChart = (data: { [s: string]: unknown; } | ArrayLike<unknown>) => {
    return Object.entries(data)
      .filter(([emotion, percentage]) => percentage !== 0) // Filter out emotions with percentage 0
      .map(([emotion, percentage]) => ({
        name: emotion,
        value: percentage,
      }));
  };

  const fetchEmotionsData = async (period: string) => {
    try {
      let start = "";
      let end = "";
      switch (period) {
        case "today":
          start = new Date().toISOString().slice(0, 10) + " 00:00:00";
          end = new Date().toISOString().slice(0, 10) + " 23:59:59";
          break;
        case "yesterday":
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          start = yesterday.toISOString().slice(0, 10) + " 00:00:00";
          end = yesterday.toISOString().slice(0, 10) + " 23:59:59";
          break;
        case "lastWeek":
          const lastWeek = new Date();
          lastWeek.setDate(lastWeek.getDate() - 7);
          start = lastWeek.toISOString().slice(0, 10) + " 00:00:00";
          end = new Date().toISOString().slice(0, 10) + " 23:59:59";
          break;
        case "lastYear":
          // Assuming selectedYearRange is a state or variable holding the selected year range
          start =
            selectedYearRange === "fullYear"
              ? "lastYearFullstart"
              : "lastYearPartialstart";
          end =
            selectedYearRange === "fullYear"
              ? "lastYearFullend"
              : "lastYearPartialend";
          break;
        case "lastMonth":
          const lastMonth = new Date();
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          start = lastMonth.toISOString().slice(0, 7) + "-01 00:00:00";
          const lastMonthEnd = new Date(
            lastMonth.getFullYear(),
            lastMonth.getMonth() + 1,
            0
          );
          end = lastMonthEnd.toISOString().slice(0, 10) + " 23:59:59";
          break;
        default:
          throw new Error("Invalid period");
      }
      console.log("Fetching data for period:", { user_id, start, end });
      const response = await fetch(`${APIURL}/get-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id as number,
          username,
          password,
          start,
          end,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch emotions data");
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      handleGenAi(data, period);
      setEmotionsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePeriodSelect = (period: React.SetStateAction<string>) => {
    setSelectedPeriod(period);
    fetchEmotionsData(period);
  };

  const handleYearRangeSelect = (range: React.SetStateAction<string>) => {
    setSelectedYearRange(range);
    if (range === "fullYear") {
      fetchEmotionsData("lastYearFull");
    } else {
      fetchEmotionsData("lastYearPartial");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <div className="text-4xl fonrt-bold py-5">Emotions Dashboard</div>
      <div className="w-3/5">
        <div className="flex justify-between py-10">
          <button
            className="bg-gray-700 rounded-lg p-1"
            onClick={() => handlePeriodSelect("today")}
          >
            Today
          </button>
          <button
            className="bg-gray-700 rounded-lg p-1"
            onClick={() => handlePeriodSelect("yesterday")}
          >
            Yesterday
          </button>
          <button
            className="bg-gray-700 rounded-lg p-1"
            onClick={() => handlePeriodSelect("lastWeek")}
          >
            Last Week
          </button>
          <button
            className="bg-gray-700 rounded-lg p-1"
            onClick={() => handlePeriodSelect("lastMonth")}
          >
            Last Month
          </button>
          <button
            className="bg-gray-700 rounded-lg p-1"
            onClick={() => handlePeriodSelect("lastYear")}
          >
            Last Year
          </button>
        </div>
      </div>
      {/* {selectedPeriod === 'lastYear' && (
        <div style={styles.yearRangeSelection}>
          <h2 style={styles.yearRangeHeading}>Select Year Range:</h2>
          <div style={styles.buttonContainer}>
            <button className={`yearRangeButton ${selectedYearRange === 'fullYear' ? 'selected' : ''}`} style={styles.button} onClick={() => handleYearRangeSelect('fullYear')}>Up to Today</button>
            <button className={`yearRangeButton ${selectedYearRange === 'partialYear' ? 'selected' : ''}`} style={styles.button} onClick={() => handleYearRangeSelect('partialYear')}>Entire Year</button>
          </div>
        </div>
      )} */}
      {selectedPeriod && (
        <div className="flex justify-between gap-20">
          <div>
            <h2>{`${
              selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)
            }'s Emotions`}</h2>
            <PieChart width={400} height={400}>
              <Pie
                data={transformDataForPieChart(emotionsData)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#03a9f4"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed()}%`
                }
              />
              <Tooltip />
            </PieChart>
          </div>
          <div>
            {resp !== "" && (
              <div dangerouslySetInnerHTML={{ __html: resp }}></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
