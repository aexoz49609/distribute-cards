import { Box, Divider, Paper, Typography } from "@mui/material";
import { Fragment, useCallback, useState } from "react";
import { DropImageFilesArea } from "./molecules/drop-image-files-area";
import { ThumbnailBox } from "./molecules/thumbnail-box";
import { v4 } from "uuid";
import { Card } from "./molecules/thumbnail-box/types";
import { NumberTextField } from "./atoms/number-text-field";

const PADDING_HORIZONTAL = 2;
const PADDING_VERTICAL = 1;

interface Rect {
  width: number;
  height: number;
}

export function App() {
  const [thumbnailSize] = useState<Rect>({ width: 16 * 3, height: 16 * 4 });
  const [cards, setCards] = useState<Card[]>([]);
  const [humanCount, setHumanCount] = useState(0);
  const [countPerHuman, setCountPerHuman] = useState(0);

  const handleChangeFiles = useCallback((files: File[]) => {
    const cards: Card[] = [];
    for (const f of files) {
      cards.push({ id: v4(), file: f, count: 1 });
    }
    setCards(cards);
  }, []);

  const handleChangeCard = useCallback(
    (card: Card) => {
      const newCards = cards.map((c) => (c.id === card.id ? card : c));
      setCards(newCards);
    },
    [cards]
  );

  const handleDeleteCard = useCallback(
    (card: Card) => {
      const newCards = cards.filter((c) => c.id !== card.id);
      setCards(newCards);
    },
    [cards]
  );

  return (
    <Box>
      <Typography>参加人数 : {humanCount.toLocaleString()}人</Typography>
      <Typography>配布枚数 : {countPerHuman.toLocaleString()}枚</Typography>
      <Paper sx={{ width: 256 }}>
        <Typography
          sx={{ fontSize: 15, px: PADDING_HORIZONTAL, py: PADDING_VERTICAL }}
        >
          設定
        </Typography>
        <Divider />
        <Box sx={{ px: PADDING_HORIZONTAL, py: PADDING_VERTICAL }}>
          <Typography sx={{ mb: PADDING_VERTICAL, fontSize: 12 }}>
            基本設定
          </Typography>
          <Box sx={{ my: 2 }}>
            <NumberTextField
              label="参加人数"
              value={humanCount}
              onChange={setHumanCount}
              fullWidth
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <NumberTextField
              label="配布枚数"
              value={countPerHuman}
              onChange={setCountPerHuman}
              fullWidth
            />
          </Box>
        </Box>
        <Divider />
        <DropImageFilesArea
          onChange={handleChangeFiles}
          sx={{ px: PADDING_HORIZONTAL, py: PADDING_VERTICAL, minHeight: 80 }}
        >
          <Typography sx={{ mb: PADDING_VERTICAL, fontSize: 12 }}>
            カード設定
          </Typography>
          {cards.length === 0 ? (
            <Typography sx={{ opacity: 0.3, fontSize: 11 }}>
              ここに画像ファイルをドロップ
            </Typography>
          ) : (
            <Box sx={{ display: "grid", rowGap: 1 }}>
              {cards.map((c, i) => {
                return (
                  <Fragment key={i}>
                    <ThumbnailBox
                      card={c}
                      onChange={handleChangeCard}
                      onDelete={handleDeleteCard}
                      width={thumbnailSize.width}
                      height={thumbnailSize.height}
                    />
                  </Fragment>
                );
              })}
            </Box>
          )}
        </DropImageFilesArea>
      </Paper>
    </Box>
  );
}
