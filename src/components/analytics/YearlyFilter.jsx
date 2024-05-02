import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoFilter } from "react-icons/io5";
import { Button } from "@/components/ui/button";

function YearlyFilter({
  yearlyDifferences,
  selectedStartYear,
  selectedEndYear,
  availableYears,
  handleFilterByYearRange,
  setSelectedStartYear,
  setSelectedEndYear,
}) {
  return (
    <div className="filterDiv">
      {yearlyDifferences.length > 0 && (
        <div className="flex items-center text-sm gap-1">
          <p className="text-blue-950 dark:text-white">
            Change from {selectedStartYear} to {selectedEndYear} is &nbsp;
            {yearlyDifferences.map((item) => (
              <span
                key={item.year}
                className={`text-2xl ${
                  item.difference > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.difference}
              </span>
            ))}
          </p>
        </div>
      )}
      <div className="w-1/2 flex gap-2">
        <Select
          id="startYear"
          onValueChange={(value) => setSelectedStartYear(value)}
          value={selectedStartYear}
          className="inputFields"
        >
          <SelectTrigger className="inputLabel dark:bg-neutral-900 dark:text-white h-8">
            <SelectValue placeholder="Start year" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          id="endYear"
          onValueChange={(value) => setSelectedEndYear(value)}
          value={selectedEndYear}
          className="inputFields mr-2"
        >
          <SelectTrigger className="inputLabel dark:bg-neutral-900 dark:text-white h-8">
            <SelectValue placeholder="End year" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleFilterByYearRange}
          aria-label="Filter"
          className="ExportBtn h-8 text-white dark:text-black"
        >
          <IoFilter />
        </Button>
      </div>
    </div>
  );
}

export default YearlyFilter;
