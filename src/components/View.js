import { BsFilePdfFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { BsEyeFill } from "react-icons/bs";
import { FaFileWord, FaFileContract } from "react-icons/fa";

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";

export default function View() {
    const web3StorageKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQwNGIyMEEzMmU2RGE0YTRDNmE1Mzk5MTg5NTc4RGFlM0ZCNkY5Y0UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTIzMzY1OTIzMjUsIm5hbWUiOiJkd2V0cmFuc2ZlciJ9.qU0dEfGsmi1-UiBv4slk1a7jidaPBehkCYxab6WRun0";
    const client = new Web3Storage({ token: web3StorageKey })

    const { file_id } = useParams()
    const navigate = useNavigate()

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const [fileData, setFileData] = useState({
        name: "",
        type: "",
        can_be_viewed: false,
        can_be_downloaded: true,
    })

    const [signedUsers, setSignedUsers] = useState([])

    useEffect(() => {
        const worker = async () => {
            if (!file_id) {
                navigate("/")
            }

            // get file data from ipfs

            const res = await client.get(file_id) // Promise<Web3Response | null>
            const files = await res.files() // Promise<Web3File[]>

            for (const file of files) {
                if (file.name) {
                    setFileData({
                        name: file.name,
                        type: file.name.split(".")[1],
                        can_be_viewed: true,
                        can_be_downloaded: true,
                        download_link: "https://google.com",
                        open_link: "https://google.com"
                    })
                }
            }

            // get users who signed the file

            setSignedUsers([
                {
                    userId: "+90 546 972 4659",
                    status: "Signed & Verified",
                    isOwner: true,
                    date: 1700319583000
                },
                {
                    userId: "+90 531 351 6308",
                    status: "Signed & Verified",
                    isOwner: false,
                    date: 1700319583000
                },
            ])

            console.log(file_id)

        }

        worker()

    }, [file_id])

    const SignButtonClicked = () => {
        // sign the file

        console.log("sign button clicked")

        return true
    }


    return (
        <>
            <div className="w-[90%] h-[110vh] md:h-[70vh] lg:w-[90%] contract-card m-3 lg:m-5  rounded-[24px]">
                <div className="h-auto lg:px-6 lg:py-4 flex flex-col justify-around items-center lg:w-[100%] bg-none">
                    <div className="flex flex-col md:flex-row justify-center items-center p-3 m-5 text-center lg:mt-3 lg:p-4 md:w-[90%] lg:w-[100%] rounded-lg hover-to-shadow  file-info" >
                        {
                            fileData.type === "pdf" ? <BsFilePdfFill className="block md:inline" color="#ee2b2b" size={50} /> :
                                fileData.type === "docx" ? <FaFileWord className="block md:inline" color="#ee2b2b" size={50} /> :
                                    <FaFileContract color="#ee2b2b" size={50} />
                        }

                        <span className="text-white text-2xl text-center">
                            {fileData.name}
                        </span>

                        <div className="mt-2 flex justify-center items-center gap-3 md:gap-5 md:flex-1  " >
                            {
                                fileData.can_be_downloaded && <span className=" p-3 download-btn hover-to-shadow rounded-xl" onClick={() => {
                                    openInNewTab(fileData.download_link)
                                }}>
                                    <IoMdDownload className="download-icon " size={20} />
                                </span>
                            }
                        </div>

                    </div>
                    <div className="signers flex flex-col gap-5 justify-center md:align-start w-[90%] h-[550px] md:h-[auto] md:my-10 overflow-y-scroll p-4 pt-0">
                        {
                            signedUsers.map((user, index) => {
                                return <div className="signer flex flex-col md:flex-row justify-center align-center gap-4 p-3 rounded-lg  hover-to-shadow w-[100%}">
                                    <span className="signer-name mt-3 md:mt-0 text-white text-xxl flex flex-col md:flex-row gap-2 justify-center items-center">
                                        <RiAdminFill size={36} />
                                        {user.userId} {
                                            user.isOwner && <span className="text-xs text-white text-opacity-50">
                                                (Owner)
                                            </span>
                                        }
                                    </span>

                                    <span className=" text-md text-green-500 flex-col mt-3 md:mt-0 flex md:flex-row gap-1 justify-center items-center">
                                        <FaCheckCircle color="green-500" />
                                        {
                                            user.status
                                        }
                                    </span>
                                    <span className="text-md text-green-500 text-opacity-50 mb:4 flex flex-col md:flex-row gap-1 justify-center items-center">
                                        <IoCalendar />
                                        {
                                            new Date(user.date).toLocaleDateString()
                                        }
                                    </span>
                                </div>

                            })
                        }


                    </div>
                    <div className="sign-button my-6 md:my-8 lg:my-1 xl:my-7 rounded-xl">
                        <button className="text-white flex justify-center items-center gap-2 sign-button p-3 rounded-xl hover-to-shadow" onClick={() => { SignButtonClicked() }}>
                            <FaFileSignature className="sign-icon" size={30} />
                            Sign the Contract
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}
