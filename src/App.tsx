import axios from "axios";
import { Octokit } from "octokit";
import React from "react";
import routes from "./routes";
import { useRoutes } from "react-router";
import "./App.css";

const octokit = new Octokit({
  auth: "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",
});

function App() {
  //* 라우트 설정
  const content = useRoutes(routes);

  const Test = async () => {
    try {
      const { data: myRepos } = await octokit.request(
        "GET /users/{username}/repos",
        {
          username: "sangkwon-lee",
        }
      );
      const data = await Promise.all(
        myRepos.map(async (data: any) => {
          return await octokit.request("GET /repos/{owner}/{repo}/commits", {
            owner: "sangkwon-lee",
            repo: data.name,
          });
        })
      );

      console.log(data);
    } catch (e) {}
  };

  return <>{content}</>;
}

export default App;
