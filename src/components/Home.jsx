import React, { useEffect, useState, useSyncExternalStore } from 'react'

const Home = () => {
  const [news, setNews] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  let pageSize = 10
  const getData = async () => {
    setLoading(true)
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=technology&category=entertainment&language=en&pageSize=${pageSize}&page=${page}&apiKey=2735ca0881e840adae4c8a09aefd44b9`,
    )
    const data = await res.json()
    console.log(data)
    setNews(data.articles)
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [, page])
  return (
    <>
      <div className="text-6xl font-extrabold text-center my-4">News-48</div>
      {loading === true ? (
        <div className="flex h-screen text-4xl items-center justify-center">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 px-4">
          {news.map((curElem, i) => {
            return (
              <>
                <div className="p-4 bg-slate-300">
                  <div className="h-[16rem] ">
                    <img
                      className="w-full "
                      src={curElem.urlToImage}
                      alt="Error 404"
                    />
                  </div>
                  <div className="capitalize  " key={i}>
                    {curElem.title}
                  </div>
                </div>
              </>
            )
          })}
        </div>
      )}

      <div className="flex justify-around py-3">
        <button
          disabled={page === 1}
          className={`${
            page === 1
              ? 'bg-slate-100 border border-gray-700 p-3 rounded-md'
              : 'bg-indigo-400 border border-gray-700 p-3 rounded-md'
          }`}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          disabled={news.length < pageSize}
          className={`${
            news.length < pageSize
              ? 'bg-slate-100 border border-gray-700 p-3 rounded-md'
              : 'bg-indigo-400 border border-gray-700 p-3 rounded-md'
          }`}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default Home
