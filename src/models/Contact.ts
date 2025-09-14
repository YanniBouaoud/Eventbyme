export default interface Contact {
  /** format: yyyy-MM-dd */
  eventDate: string;
  city: string;
  /** Lieu précis / adresse */
  venue: string;
  theme: string;
  /** Ex: "noir, blanc, doré" */
  colors: string;
}
