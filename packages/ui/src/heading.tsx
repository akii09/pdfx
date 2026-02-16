import { StyleSheet, Text } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";

export interface HeadingProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children: string;
    style?: Style;
}

const styles = StyleSheet.create({
    h1: { fontSize: 32, fontWeight: "bold", marginBottom: 16 },
    h2: { fontSize: 24, fontWeight: "bold", marginBottom: 14 },
    h3: { fontSize: 18.72, fontWeight: "bold", marginBottom: 12 },
    h4: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
    h5: { fontSize: 13.28, fontWeight: "bold", marginBottom: 8 },
    h6: { fontSize: 10.72, fontWeight: "bold", marginBottom: 6 },
});

export function Heading({ level = 1, children, style }: HeadingProps) {
    const headingStyle = styles[`h${level}` as keyof typeof styles];

    return (
        <Text style={style ? [headingStyle, style] : headingStyle}>{children}</Text>
    );
}
