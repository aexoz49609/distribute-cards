import { Box, IconButton, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { NumberTextField } from "../../atoms/number-text-field";
import { Card } from "./types";
import { Close } from "@mui/icons-material";

interface Props {
  card: Card;
  onChange: (card: Card) => void;
  onDelete: (card: Card) => void;
  width: number;
  height: number;
}

export function ThumbnailBox({
  card,
  onChange,
  onDelete,
  width,
  height,
}: Props) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(card.file);
    reader.addEventListener("load", () => {
      setUrl(reader.result as string);
    });
  }, [card.file]);

  const handleChange = useCallback(
    (count: number) => {
      onChange({ ...card, count });
    },
    [onChange, card]
  );

  const handleDelete = useCallback(() => {
    onDelete(card);
  }, [onDelete, card]);

  return (
    <Box
      sx={{
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "auto 64px 1fr auto",
        columnGap: 1,
      }}
    >
      {url !== "" && (
        <img
          src={url}
          alt=""
          width={width}
          height={height}
          style={{
            display: "block",
            width,
            height,
            objectFit: "cover",
          }}
        />
      )}
      <Typography sx={{ fontSize: 12, textAlign: "right" }}>
        {card.count.toLocaleString()}枚
      </Typography>
      <NumberTextField
        value={card.count}
        onChange={handleChange}
        InputProps={{
          sx: { fontSize: 12 },
        }}
      />
      <Box>
        <IconButton size="small" onClick={handleDelete}>
          <Close sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
