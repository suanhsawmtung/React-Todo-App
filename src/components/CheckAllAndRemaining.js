import React from "react";

export default function CheckAllAndRemaining({
  remainingItemsCount,
  checkAll,
}) {
  return (
    <div className="check-all-container">
      <div>
        <div className="button" onClick={checkAll}>
          Check All
        </div>
      </div>

      <span>
        {remainingItemsCount} item{remainingItemsCount > 1 ? "s" : ""} remaining
      </span>
    </div>
  );
}
