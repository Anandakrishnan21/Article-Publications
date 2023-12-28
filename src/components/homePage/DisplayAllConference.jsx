"use client";
import { useState, useEffect } from "react";
import Pagination from "../comp/Pagination";
import { IoFilterCircleOutline } from "react-icons/io5";
import ConferenceTable from "../comp/ConferenceTable";
import Loading from "@/app/home/loading";

const DisplayAllConference = () => {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState(null);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const res = await fetch("/api/addConference", {
          cache: "no-store",
        });

        if (!res.ok) {
          setError("Failed to fetch data");
          return;
        }

        const data = await res.json();
        setPapers(data);

        setIsLoading(false);
      } catch (error) {
        setError("Error fetching papers: " + error.message);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleTitleChange = (e) => {
    setFilterTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setFilterAuthor(e.target.value);
  };

  const filteredPapers = papers.filter((paper) => {
    const matchesTitle = paper.title
      .toLowerCase()
      .includes(filterTitle.toLowerCase());
    const matchesAuthor = paper.author1
      .toLowerCase()
      .includes(filterAuthor.toLowerCase());

    return (
      (filterTitle === "" || matchesTitle) &&
      (filterAuthor === "" || matchesAuthor)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPapers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-5 pt-20 box-border lg:h-screen">
      <div className="flex flex-col items-center pt-6">
        <p className="text-base md:text-3xl dark:text-neutral-50 font-semibold pb-6">
          Latest Uploaded Conferences
        </p>
        <div className="flex items-start p-2 gap-2">
          <p className="bg-neutral-50 dark:bg-neutral-900 p-2 rounded-full">
            <IoFilterCircleOutline className="h-6 w-6" />
          </p>
          <input
            type="text"
            placeholder="Filter by Title"
            value={filterTitle}
            onChange={handleTitleChange}
            className="inputFields"
          />
          <input
            type="text"
            placeholder="Filter by Author"
            value={filterAuthor}
            onChange={handleAuthorChange}
            className="inputFields"
          />
        </div>
        <ConferenceTable currentItems={currentItems} setPapers={setPapers} />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={papers.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default DisplayAllConference;
