import Commit from '@/components/commit'
import Head from 'next/head'

export default function Index() {
  return (
    <div>
      <Head>
        <title>首页</title>
      </Head>
      <div>
        <div className="flex flex-col w-full border-opacity-50">
          <div className="grid card bg-base-300 rounded-box place-items-center">首页 / 全部商品 / 评价</div>
          <div className="divider" />
          <div className="grid card rounded-box place-items-center" >
            <div style={{ display: 'flex' }}>
              <textarea placeholder="Bio" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
              <button className="btn btn-outline btn-success" style={{ height: '80px', margin: '10px' }}>发布评价</button>
            </div>
          </div>
          <div className="divider" />
          <div className="grid card bg-base-300 rounded-box place-items-center">
            <div className="btn-group btn-group-vertical lg:btn-group-horizontal" style={{ margin: '10px' }}>
              <button className="btn btn-active">Button1</button>
              <button className="btn">Button2</button>
              <button className="btn">Button3</button>
              <button className="btn">Button4</button>
              <button className="btn">Button5</button>
              <button className="btn">Button6</button>
            </div>
          </div>
          <div className="divider" />
          <div className="grid card bg-base-300 rounded-box place-items-center">
            <div style={{ width: '80%', overflowX: 'scroll', height: '48vh' }}>
              <table className="table w-full" >
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody >
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                  <Commit />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
