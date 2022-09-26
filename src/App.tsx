import { Octokit } from "octokit";
import React from "react";
import { useEffect } from "react";
import "./App.css";
const octokit = new Octokit({
  auth: "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",
});
function App() {
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

  useEffect(() => {
    Test();
  }, []);

  return (
    <>
      <img src="https://ghchart.rshah.org/sangkwon-lee" alt="" />
    </>
  );
}

export default App;
