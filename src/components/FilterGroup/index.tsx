import gsap from "gsap";
import React, { Dispatch, SetStateAction, useEffect, memo } from "react";
import { MusicCategory } from "../../App";
import "./style.css";

interface FilterGroupInterface {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setMusicCategory: Dispatch<SetStateAction<MusicCategory>>;
  categoryTitle: string;
}

const musicCategoryList = [
  { name: "top100_VN", index: 0, title: "Nhạc Trẻ" },
  { name: "top100_VN", index: 1, title: "Nhạc Bolero" },
  { name: "top100_VN", index: 4, title: "Rap Việt" },
  { name: "top100_CA", index: 0, title: "Nhạc Hàn" },
  { name: "top100_CA", index: 1, title: "Nhạc Trung" },
  { name: "top100_AM", index: 0, title: "Nhạc Âu Mỹ" },
];

const FilterGroup: React.FC<FilterGroupInterface> = ({
  searchTerm,
  setSearchTerm,
  setMusicCategory,
  categoryTitle,
}) => {
  useEffect(() => {
    gsap.from(".filter-item", {
      duration: 2,
      opacity: 0,
      delay: 0.5,
      stagger: 0.2,
      ease: "elastic",
      force3D: true,
    });
  }, []);

  return (
    <div className="filter-group">
      <h2>Top 100 {categoryTitle} hot nhất hiện nay</h2>

      <ul className="filter-list">
        {musicCategoryList.map((item, index) => (
          <li
            className={
              item.title === categoryTitle
                ? `filter-item active`
                : `filter-item`
            }
            key={index}
            onClick={() => setMusicCategory(item)}
          >
            {item.title}
          </li>
        ))}
      </ul>

      <input
        type="search"
        placeholder="Tìm kiếm tên bài hát"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default memo(FilterGroup);
