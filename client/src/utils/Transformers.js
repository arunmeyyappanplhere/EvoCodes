import { resolveIcon } from './serviceIcons.js'

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : ''

const truncate = (text = '', max = 140) =>
  text.length > max ? `${text.slice(0, max).trim()}…` : text

// projects: { projectID, projectName, projectCoverImg, projectDesc, projectSectors[], projectSiteLink, createdAt }
// Your schema has no separate "category" or "date" field, so we derive them:
// category <- first sector, date <- createdAt (assumes { timestamps: true } on the model, as Testimonials has).
export function transformProject(p) {
  const sectors = Array.isArray(p.projectSectors) ? p.projectSectors : []
  return {
    id: p.projectID,
    title: p.projectName,
    category: sectors[0] || 'General',
    sectors,
    date: formatDate(p.createdAt),
    image: p.projectCoverImg,
    shortDesc: truncate(p.projectDesc),
    fullDesc: p.projectDesc,
    liveUrl: p.projectSiteLink,
  }
}

// blogs: { blogID, blogTitle, blogImg, blogAuthor, blogCategory, blogDate, blogDescription, blogContent, blogStatus }
export function transformBlog(b) {
  return {
    id: b.blogID,
    title: b.blogTitle,
    author: b.blogAuthor,
    category: b.blogCategory,
    date: formatDate(b.blogDate),
    image: b.blogImg,
    shortDesc: b.blogDescription,
    content: b.blogContent,
    status: b.blogStatus,
  }
}

// services: { serviceID, serviceName, serviceHead, serviceDescription, serviceIcon, serviceColor, serviceTechStacks[] }
// serviceIcon is usually a lucide-react icon name string (e.g. "Cloud"), but the
// controller allows a legacy Cloudinary image URL too — handle both.
export function transformService(s) {
  const isImageIcon = typeof s.serviceIcon === 'string' && /^https?:\/\//.test(s.serviceIcon)
  return {
    id: s.serviceID,
    icon: isImageIcon ? null : resolveIcon(s.serviceIcon),
    iconUrl: isImageIcon ? s.serviceIcon : null,
    head: s.serviceHead,
    title: s.serviceName,
    desc: s.serviceDescription,
    color: s.serviceColor,
    stack: Array.isArray(s.serviceTechStacks) ? s.serviceTechStacks : [],
  }
}

// testimonials: { _id, testimonialName, testimonialRole, testimonialCompany, testimonialProject, testimonialQuote, testimonialRating, testimonialStatus }
export function transformTestimonial(t) {
  const initials = (t.testimonialName || '')
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return {
    id: t._id,
    name: t.testimonialName,
    role: t.testimonialCompany ? `${t.testimonialRole}, ${t.testimonialCompany}` : t.testimonialRole,
    quote: t.testimonialQuote,
    initials: initials || '??',
    rating: Number(t.testimonialRating) || 5,
    status: t.testimonialStatus,
  }
}