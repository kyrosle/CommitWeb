import Commit from '@/components/commit'
import Head from 'next/head'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'

interface InfoAlyProp {
  labels: string[],
  text: string,
}

/**
 * 主页面
 * 发布评价 - json - {text: string } - {label: [], text: string }
 * label : 全部, 味道好， 味道差， 态度好， 态度差， 卫生状态， 不新鲜， 其他
 * label [cnt]
 * commits:
 *  commit * 1 ~ text ~ labels
 */
export default function Index() {
  /**
   * 钩子函数在组件挂载后执行一次，用于初始化页面。
   * 其中initActive函数用于初始化标签状态，
   * setActive[0](true)设置默认选中“全部”标签，
   * init函数用于获取所有评价信息并设置到infoAly状态中
   */
  useEffect(() => {
    initActive();
    setActive[0](true);
    async function init() {
      const infos = await sendLabel('全部');
      setInfoAly(infos);
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 钩子函数用于定义状态变量。
   * 其中commit状态用于存储用户输入的评价内容，
   * infoAly状态用于存储当前显示的评价信息，
   * labelCnt状态用于存储各个标签对应的评价数量，
   * labelActive状态用于存储各个标签的选中状态。
   */
  const [commit, setCommit] = useState('');
  const [infoAly, setInfoAly] = useState<InfoAlyProp[]>([]);

  const [labelCnt0, setCnt0] = useState(0);
  const [labelCnt1, setCnt1] = useState(0);
  const [labelCnt2, setCnt2] = useState(0);
  const [labelCnt3, setCnt3] = useState(0);
  const [labelCnt4, setCnt4] = useState(0);
  const [labelCnt5, setCnt5] = useState(0);
  const [labelCnt6, setCnt6] = useState(0);
  const [labelCnt7, setCnt7] = useState(0);

  const labelCnt = [labelCnt0, labelCnt1, labelCnt2, labelCnt3, labelCnt4, labelCnt5, labelCnt6, labelCnt7];
  const setCnt = [setCnt0, setCnt1, setCnt2, setCnt3, setCnt4, setCnt5, setCnt6, setCnt7];

  const [labelActive0, setActive0] = useState(true);
  const [labelActive1, setActive1] = useState(false);
  const [labelActive2, setActive2] = useState(false);
  const [labelActive3, setActive3] = useState(false);
  const [labelActive4, setActive4] = useState(false);
  const [labelActive5, setActive5] = useState(false);
  const [labelActive6, setActive6] = useState(false);
  const [labelActive7, setActive7] = useState(false);

  const labelActive = [labelActive0, labelActive1, labelActive2, labelActive3, labelActive4, labelActive5, labelActive6, labelActive7];
  const setActive = [setActive0, setActive1, setActive2, setActive3, setActive4, setActive5, setActive6, setActive7];


  /**
   * 函数用于初始化标签状态，将所有标签的选中状态设置为false
   */
  const initActive = async () => {
    setActive.forEach((setActive) => setActive(false));
    await setCnts();
  }


  /**
   * 函数用于获取各个标签对应的评价数量并设置到labelCnt状态中
   */
  const setCnts = async () => {
    const cnts: number[] = await fetchCnts();
    cnts.forEach((cnt, index) => setCnt[index](cnt))
  }


  /**
   * 函数用于处理用户输入评价内容的事件，将用户输入的内容设置到commit状态中。
   */
  const textChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setCommit(e.target.value);
  }

  /**
   * 函数用于处理用户点击发布评价按钮的事件，
   * 将用户输入的评价内容发送到后端API进行处理，
   * 获取处理后的评价信息并设置到infoAly状态中。
   */
  const onclick = async () => {
    const res = await fetch('/api/information_analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: commit })
    });
    const data: InfoAlyProp = await res.json();
    console.log(data);
    await initActive();
    setInfoAly([data]);
  }

  /**
   * 函数用于渲染评价信息，将infoAly状态中的评价信息逐个渲染为Commit组件。
   */
  const showCommits = (commits: InfoAlyProp[]) => {
    return (commits.map((commit, index) => <Commit key={index} labels={commit.labels} commit={commit.text} />))
  }

  /**
   * 返回了一个包含页面各个部分的HTML代码，其中包括标题、输入评价的文本框和发布按钮、标签按钮、评价信息列表等
   */
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
              <textarea placeholder="输入评价" className="textarea textarea-bordered textarea-lg w-full max-w-xs" onChange={textChange} />
              <button className="btn btn-outline btn-success" style={{ height: '80px', margin: '10px' }} onClick={onclick}>发布评价</button>
            </div>
          </div>
          <div className="divider" />
          <div className="grid card bg-base-300 rounded-box place-items-center">
            <div className="btn-group btn-group-vertical lg:btn-group-horizontal" style={{ margin: '10px' }}>
              {/* label : 全部, 味道好， 味道差， 态度好， 态度差， 卫生状态， 不新鲜， 其他 */}
              <Button label='全部' cnt={labelCnt[0]} active={labelActive[0]} setActive={setActive[0]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='味道好' cnt={labelCnt[1]} active={labelActive[1]} setActive={setActive[1]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='味道差' cnt={labelCnt[2]} active={labelActive[2]} setActive={setActive[2]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='态度好' cnt={labelCnt[3]} active={labelActive[3]} setActive={setActive[3]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='态度差' cnt={labelCnt[4]} active={labelActive[4]} setActive={setActive[4]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='卫生状态' cnt={labelCnt[5]} active={labelActive[5]} setActive={setActive[5]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='不新鲜' cnt={labelCnt[6]} active={labelActive[6]} setActive={setActive[6]} initActive={initActive} setInfoAly={setInfoAly} />
              <Button label='其他' cnt={labelCnt[7]} active={labelActive[7]} setActive={setActive[7]} initActive={initActive} setInfoAly={setInfoAly} />
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
                  {/* 展示评论 */}
                  {showCommits(infoAly)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 定义了一个类型接口，包含了标签按钮的相关属性，包括标签名称、对应评价数量、选中状态等。
 */
interface ButtonProp {
  label: string,
  cnt: number,
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  initActive: () => void
  setInfoAly: Dispatch<SetStateAction<InfoAlyProp[]>>
}

/**
 *  函数用于获取各个标签对应的评价数量。发送GET请求到后端API，获取评价数量数据并返回
 */
const fetchCnts = async () => {
  const url = '/api/get_information';
  const res = await fetch(url, { method: 'GET' });
  const data = await res.json();
  const cnt = data.data;
  console.log(cnt);
  return cnt;
}

/**
 * 函数用于获取某个标签对应的评价信息。发送POST请求到后端API，携带标签名称参数，获取评价信息数据并返回。
 */
const sendLabel = async (label: string) => {
  const url = '/api/get_information';
  const json = { label: label };
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(json) });
  const commits: InfoAlyProp[] = await res.json();
  console.log(commits);
  return commits;
}

/**
 * 函数组件接收一个包含标签按钮相关属性的对象作为参数，包括标签名称、对应评价数量、选中状态等
 */
const Button: React.FunctionComponent<ButtonProp> = ({ label, cnt, active, setActive, initActive, setInfoAly }) => {
  // 组件返回一个button元素，包含标签名称和对应评价数量。当标签被选中时，button元素会添加btn-active类名
  /**
   * 点击标签按钮时，会先调用initActive函数将所有标签的选中状态设置为false，然后调用sendLabel函数获取该标签对应的评价信息，
   * 将评价信息设置到infoAly状态中，并将该标签的选中状态设置为true
   */
  return (
    <button
      className={`btn ${active && 'btn-active'}`}
      onClick={
        async () => {
          await initActive();
          const infos = await sendLabel(label);
          setInfoAly(infos);
          setActive(!active);
        }} >
      {label}
      <span style={{ margin: '0 10px' }}>
        {cnt}
      </span >
    </button >
  )
}
