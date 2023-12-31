"use client";
import { useState, useEffect } from "react";
import Pagination from "../comp/Pagination";
import ConferenceTable from "../comp/ConferenceTable";
import Loading from "@/app/home/loading";
import { Button } from "../ui/button";

const DisplayUserConference = () => {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    title: "",
    author: "",
    pubYear: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const res = await fetch("/api/userConference", {
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

  const handleYearChange = (e) => {
    setFilterYear(e.target.value);
  };

  const handleSearch = (e) => {
    setIsSearchClicked(true);
    setSearchFilters({
      title: filterTitle,
      author: filterAuthor,
      pubYear: filterYear,
    });
    setCurrentPage(1);
  };

  const applyFilters = () => {
    return papers.filter((paper) => {
      const matchesTitle = paper.title
        .toLowerCase()
        .includes(searchFilters.title.toLowerCase());
      const matchesAuthor = paper.author1
        .toLowerCase()
        .includes(searchFilters.author.toLowerCase());
      const matchesYear =
        !searchFilters.pubYear ||
        paper.pubYear === parseInt(searchFilters.pubYear);

      return (
        (searchFilters.title === "" || matchesTitle) &&
        (searchFilters.author === "" || matchesAuthor) &&
        matchesYear
      );
    });
  };

  const filteredPapers = isSearchClicked ? applyFilters() : papers;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPapers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="box-border lg:h-screen p-5 pt-24">
      <div className="flex flex-col items-center justify-center pt-6 gap-4">
        <div className="w-full justify-center flex gap-4">
          <div className="w-1/4">
            <label for="titFilter" className="inputLabel">
              Title
            </label>
            <input
              type="text"
              value={filterTitle}
              onChange={handleTitleChange}
              className="inputFields"
            />
          </div>
          <div className="w-1/4">
            <label for="authFilter" className="inputLabel">
              Author
            </label>
            <input
              type="text"
              value={filterAuthor}
              onChange={handleAuthorChange}
              className="inputFields"
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="yearFilter" className="inputLabel">
              Year
            </label>
            <input
              type="text"
              value={filterYear}
              onChange={handleYearChange}
              className="inputFields"
            />
          </div>
          <div className="w-1/4 flex items-end">
            <Button variant="downBtn" className="w-full" onClick={handleSearch}>
              Search
            </Button>
          </div>
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

export default DisplayUserConference;
