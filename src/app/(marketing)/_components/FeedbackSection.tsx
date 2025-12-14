import { getTestimonials } from "@/features/testimonial/services/testimonial.service";
import FeedbackCarousel from "./FeedbackCarousel";

export default async function FeedbackSection() {
  const res = await getTestimonials({ page: 1, limit: 6 });
  return <FeedbackCarousel testimonials={res.data} />;
}
