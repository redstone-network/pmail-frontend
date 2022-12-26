/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
import React from 'react'
import Cupload from '@/assets/icons/upload.png'
import { Upload } from 'antd'
const { Dragger } = Upload
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useAppSelector } from '@/hooks'
import { downloadFile } from '@/api/index'
import {transfer} from '@/api/substrate'
import { toast } from 'react-toastify'
import Empty from '@/components/Empty'
import './index.css'

function Cloud() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const user = useAppSelector((state) => state.user)
  const [loading, setLoading] = useState(false)

  function getDefaultFileList() {
    if (user.address && window.localStorage.getItem(user.address)) {
      const fileListString = window.localStorage.getItem(user.address)
      return JSON.parse(fileListString as string)
    }
    return []
  }
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: (file) => {
      return `/api/storage/${file.uid}`
    },
    beforeUpload: () => {
      return transfer()
    },
    onRemove: (file) => {
      setLoading(false)
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      window.localStorage.setItem(user.address, JSON.stringify(newFileList))
    },
    showUploadList: {
      showDownloadIcon: true,
      showPreviewIcon: false,
      showRemoveIcon: true,
    },
    onChange:async (info) => {
      setLoading(true)
      const { status } = info.file;
      if (status === 'done') {
        setLoading(false)
        toast.success(`${info.file.name} file uploaded successfully.`, {
          autoClose: 2000,
          isLoading: false,
          pauseOnFocusLoss: false,
          hideProgressBar: true,
          closeButton: false
        })
        setFileList(info.fileList);
        window.localStorage.setItem(user.address, JSON.stringify(info.fileList))
      } else if (status === 'error') {
        setLoading(false)
        toast.error(`${info.file.name} file upload failed.`, {
          autoClose: 2000,
          isLoading: false,
          pauseOnFocusLoss: false,
          hideProgressBar: true,
          closeButton: false
        })
      }
    },
    defaultFileList: getDefaultFileList(),
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(1))}%`,
    },
    listType: 'picture-card',
    onPreview: () => {
      return false
    },
    onDownload: (file) => {
      console.log(file)
      downloadFile(file.response.data, file.name)
      return false
    },
    itemRender: (originNode) => {
      return (
        <div className="cursor-pointer">
          {originNode}
        </div>
      )}
    }

  return (
    <div className="h-full rounded-lg bg-white pt-8 shadow overflow-scroll">
      <div className="px-8">
        <Dragger {...props}>
          <p className="pt-7 pb-6 flex justify-center ">
            <img className="w-9 h-9" src={Cupload} alt="" />
          </p>
          <p className="text-lg lining-5 text-textBlack font-bold	 font-sans">
            Click or drag file to this area to upload
          </p>
          <p className="text-lg lining-5 pb-2 text-textBlack font-sans">
            Support for a single or bulk upload
          </p>
        </Dragger>
      </div>
    </div>
  )
}

export default Cloud
