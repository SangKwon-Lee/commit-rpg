import axios from "axios";
import { Octokit } from "octokit";
import React, { useEffect } from "react";
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

      const { data: commit } = await octokit.request(
        "GET /repos/{owner}/{repo}/commits?per_page=100&page=",
        {
          owner: "sangkwon-lee",
          repo: "SangKwon-Lee.github.io",
        }
      );

      const result = await Promise.all(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(async (data) => {
          const test = await octokit.request(
            `GET /repos/{owner}/{repo}/commits?per_page=100&page=${data}`,
            {
              owner: "sangkwon-lee",
              repo: "SangKwon-Lee.github.io",
            }
          );
          if (test.data.length > 0) {
            return test;
          } else {
            return "";
          }
        })
      );
      console.log(result);

      // console.log(commit);
      // const data = await Promise.all(
      //   myRepos.map(async (data: any) => {
      //     return await octokit.request(
      //       "GET /repos/{owner}/{repo}/commits?per_page=100&page=2",
      //       {
      //         owner: "sangkwon-lee",
      //         repo: data.name,
      //       }
      //     );
      //   })
      // );

      // console.log(data);
    } catch (e) {}
  };
  useEffect(() => {
    Test();
  }, []);

  return <>{content}</>;
}

export default App;
