import authRoutes from '../services/admin/auth/routes';
import userRoutes from '../services/admin/user/routes';
import categoryRoutes from '../services/admin/categories/routes';
import locationRoutes from '../services/admin/locations/routes';
import postRoutes from '../services/admin/posts/routes';
import priceCatalogRoutes from '../services/admin/priceCatalog/routes';
import reviewRoutes from '../services/admin/reviews/routes';
import healthRoutes from '../services/admin/health/router'
import profileRoutes from '../services/admin/profile/routes'
export default [
    ...authRoutes,
    ...userRoutes,
    ...categoryRoutes,
    ...locationRoutes,
    ...postRoutes,
    ...priceCatalogRoutes,
    ...reviewRoutes,
    ...profileRoutes,
    ...healthRoutes
];
