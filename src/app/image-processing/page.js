// app/image-processing/page.js
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import ObjectDetection from '../../../components/object-detection';

export default withPageAuthRequired(async function ImageProcessing(context) {
  const { user } = await getSession(context.req, context.res) || {};
  console.log("User data:", user);

  return (
    <ObjectDetection />
  );
});
