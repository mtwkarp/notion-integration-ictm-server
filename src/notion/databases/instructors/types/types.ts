export type InstructorAvailableDatesCollection = string[];

export type InstructorAvailabilityDatabasePageSchema = {
  parent: { database_id: string };
  properties: { Дата: { date: { start: string } }; Інструктори: { rich_text: { text: { content: string } }[] } };
};
