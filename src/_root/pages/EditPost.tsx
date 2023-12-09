import PostFrom from "@/components/ui/froms/PostFrom"
import Loader from "@/components/ui/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutation";
import { useParams } from "react-router-dom"

const EditPost = () => {

  const { id} = useParams();
  const { data:post,isLoading }  = useGetPostById(id || '');

  if(isLoading) return <Loader></Loader>

  return (
    <div className="flex flex-1 ">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/add-post.svg" width={36} height={36} alt="add"></img>
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
      <PostFrom action="Update" post={post}></PostFrom>
      </div>     
    </div>
  )
}

export default EditPost