import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center gap-4 flex-col items-center text-white h-[44vh]">
        <div className="font-bold text-5xl flex justify-center items-center ">Buy Me a Chai! <span>   <Image
          src="/chai-logo.svg"
          alt="Chai cup logo"
          width={88}
          height={88}
        />
        </span>
        </div>

        <p>
          A crowdfunding platform for creators. Get funded by your fans and
          followers. Start now!
        </p>

        <div>
          <Link href="/login">
            <button type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> Start Here </button>
          </Link>
          <Link href="/about">
            <button type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Read more </button>
          </Link>
        </div>
      </div>

      <div className="bg-white opacity-10 h-1">sss</div>

      <div className="text-white container mx-auto py-32">
        <h1 className="text-2xl font-bold text-center mb-16">Your Fans can buy you a Chai</h1>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.svg" alt=""
            />
            <p className="font-bold ">Your Fans want to help</p>
            <p className=" text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.svg" alt="" />
            <p className="font-bold ">Your Fans want to help</p>
            <p className=" text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.svg" alt="" />
            <p className="font-bold ">Your Fans want to help</p>
            <p className=" text-center">Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white opacity-10 h-1">sss</div>

      <div className="text-white container mx-auto py-32 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center mb-16">Know more about us</h1>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/QtaorVNAwbI?si=2YUVbRUldSKkOMPw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  );
}
