import Typography, { TypographyProps } from "@mui/material/Typography";

export const Body1 = (props: TypographyProps) => {
  return (
    <Typography variant="body1" data-testid="typography-body1" {...props} />
  );
};

export const Body2 = (props: TypographyProps) => {
  return (
    <Typography variant="body2" data-testid="typography-body2" {...props} />
  );
};

export const Subtitle1 = (props: TypographyProps) => {
  return (
    <Typography
      variant="subtitle1"
      data-testid="typography-subtitle1"
      {...props}
    />
  );
};

export const Subtitle2 = (props: TypographyProps) => {
  return (
    <Typography
      variant="subtitle2"
      data-testid="typography-subtitle2"
      {...props}
    />
  );
};

export const Caption = (props: TypographyProps) => {
  return (
    <Typography variant="caption" data-testid="typography-caption" {...props} />
  );
};

export const Overline = (props: TypographyProps) => {
  return (
    <Typography
      variant="overline"
      data-testid="typography-overline"
      {...props}
    />
  );
};

export const H1 = (props: TypographyProps) => {
  return <Typography variant="h1" data-testid="typography-h1" {...props} />;
};

export const H2 = (props: TypographyProps) => {
  return <Typography variant="h2" data-testid="typography-h2" {...props} />;
};

export const H3 = (props: TypographyProps) => {
  return <Typography variant="h3" data-testid="typography-h3" {...props} />;
};

export const H4 = (props: TypographyProps) => {
  return <Typography variant="h4" data-testid="typography-h4" {...props} />;
};

export const H5 = (props: TypographyProps) => {
  return <Typography variant="h5" data-testid="typography-h5" {...props} />;
};

export const H6 = (props: TypographyProps) => {
  return <Typography variant="h6" data-testid="typography-h6" {...props} />;
};
