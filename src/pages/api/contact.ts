import { handler } from '../../api/contact';
import { withErrorHandler } from '../../api/middleware';

export default withErrorHandler(handler);
