export { };

declare global {
  interface HistoricalEvent {
    id: number;
    title: string;
    description: string;
    position: [number, number];
    category: string;
  }
}
