import useSwr from "swr";
import Head from "next/head";
import Article from "../components/Article";

import getDailyReadings from "../lib/getDailyReadings";

type post = {
	title: string;
	date: string;
	contents: string;
	source: string;
};

type dataType = {
	readings: post[];
};

type Props = {
	data: dataType;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSwr<dataType>("/api/readings", fetcher);

  if (error) return <div>Failed to load users</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

	return (
		<>
			<Head>
				<title>Daily Readings</title>
				<meta name="description" content="Daily Readings in the Orthodox Church" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				{data.readings.map((post: post, index: number) => (
					<Article
						key={index}
						title={post.title}
						date={post.date}
						contents={post.contents}
						source={post.source}
					/>
				))}
			</main>
		</>
	);
}
