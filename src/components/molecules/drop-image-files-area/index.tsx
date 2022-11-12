import { Box, BoxProps } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

type Props = Omit<BoxProps, "onChange" | "onDragOver" | "onDrop"> & {
  onChange?: (files: File[]) => void;
  children?: React.ReactNode;
};

export function DropImageFilesArea({ onChange, children, ...props }: Props) {
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length === 0) return;
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      onChange?.(imageFiles);
    },
    [onChange]
  );

  useEffect(() => {
    if (div === null) return;
  }, [div]);

  return (
    <Box
      {...props}
      ref={setDiv}
      onDragOver={(e) => void e.preventDefault()}
      onDrop={handleDrop}
    >
      {children}
    </Box>
  );
}
