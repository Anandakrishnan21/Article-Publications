"use client";
import { useState, useEffect } from "react";
import { PaginationElement } from "../comp/button/Pagination";
import ConferenceTable from "../comp/conference/ConferenceTable";
import Loading from "@/app/home/loading";
import { Button } from "@/components/ui/button";
import PageNotFound from "../common/PageNotFound";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/Input";

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
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
    <div className="DisplayMainDiv">
      <div className="DisplayMainInnerDiv">
        <div className="DisplaySearchDiv">
          <div className="FilterInputDiv">
            <Input
              type="text"
              id="title"
              value={filterTitle}
              onChange={handleTitleChange}
              className="inputFields"
              placeholder="Search by title"
            />
          </div>
          <div className="FilterInputDiv">
            <Input
              type="text"
              id="author"
              value={filterAuthor}
              onChange={handleAuthorChange}
              className="inputFields"
              placeholder="Search by author"
            />
          </div>
          <div className="FilterInputDiv">
            <Input
              type="text"
              id="year"
              value={filterYear}
              onChange={handleYearChange}
              className="inputFields"
              placeholder="Search by year"
            />
          </div>
          <div className="FilterSearchBtnDiv">
            <Button className="FilterSearchBtn" onClick={handleSearch}>
              <p className="md:hidden">Search</p>
              <FaSearch className="text-neutral-300 dark:text-neutral-500" />
            </Button>
          </div>
        </div>
        {filteredPapers.length == 0 ? (
          <PageNotFound paper="Conferences" />
        ) : (
          <>
            <ConferenceTable
              currentItems={currentItems}
              papers={papers}
              setPapers={setPapers}
            />
            <PaginationElement
              itemsPerPage={itemsPerPage}
              totalItems={papers.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayUserConference;
