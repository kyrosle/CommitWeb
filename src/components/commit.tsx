const Commit: React.FunctionComponent = () => {
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <span>MX</span>
            </div>
          </div>
        </div>
      </td>
      <td>
        Commit....
      </td>
      <td>
        <div className="badge badge-accent badge-outline">accent</div>
      </td>
    </tr>
  )
}

export default Commit;