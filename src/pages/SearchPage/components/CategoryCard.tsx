import { Box, Typography } from "@mui/material";
import type { Category } from "../../../models/category";

const getCategoryColor = (id: string) => {
  const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `hsl(${sum % 360}, 45%, 45%)`;
};

const CategoryCard = ({ category }: { category: Category }) => {
  const imageUrl = category.icons?.[0]?.url;

  return (
    <Box
      sx={{
        position: "relative",
        height: 180,
        p: 2,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        bgcolor: getCategoryColor(category.id),
        transition: "transform 0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          "& .category-img": { transform: "rotate(25deg) scale(1.1)" },
        },
      }}
    >
      <Typography
        fontWeight={700}
        sx={{ fontSize: "20px", wordBreak: "keep-all" }}
      >
        {category.name}
      </Typography>

      {imageUrl && (
        <Box
          component="img"
          className="category-img"
          src={imageUrl}
          alt={category.name}
          sx={{
            position: "absolute",
            right: -10,
            bottom: -5,
            width: 120,
            height: 120,
            borderRadius: "8px",
            transform: "rotate(15deg)",
            boxShadow: "-4px 4px 12px rgba(0,0,0,0.3)",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      )}
    </Box>
  );
};

export default CategoryCard;
