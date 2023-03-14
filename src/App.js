import "./App.css";
import { useRef, useState } from "react";
function App() {
  const ref = useRef();
  const Titleref = useRef();
  var time = new Date();

  var [categorynew, setNewCate] = useState("");
  var [categorynew2, setNewCate2] = useState("");
  var [modal, setModal] = useState(true);

  const editbutton = useRef();
  var localArr = JSON.parse(localStorage.getItem("jobs"));
  const [job1, setJob] = useState({
    jobid: "",
    title: "",
    nd: "",
    time,
    category,
  });
  const [jobs, setJobs] = useState(localArr ? localArr : []);
  // var { jobid, title, nd, category } = job1;
  var [id, setId] = useState(1);
  var [index1, setIndex] = useState(0);

  const handleSub = (e) => {
    const newJobid = jobs.length + 1 + 1 + 1;
    jobid = newJobid;
    nd = ref.current.value;
    title = Titleref.current.value;
    category = categorynew;

    setJobs((pre) => {
      const newArr = [...pre, { jobid, title, nd, time, category }];
      const localjobs = JSON.stringify(newArr);
      localStorage.setItem("jobs", localjobs);

      return newArr;
    });
    setModal(true);
  };

  const handleEdit = (title, nd, jobid, index) => {
    const newJobid = jobid;
    id = jobid;
    setId(jobid);
    index1 = index;

    setIndex(index);

    setId(id);

    setModal(false);
    setJob(() => {
      var m = {
        jobid: jobid,
        title: title,
        nd: nd,
      };
      return m;
    });

    // }
  };

  const handleSave = () => {
    // nd = ref.current.value;
    title = Titleref.current.value;
    nd = ref.current.value;

    jobs.splice(index1, 1, {
      jobid: id,
      title: title,
      time,
      nd: nd,
      category: categorynew,
    });
    category = categorynew;
    setJobs((pre) => {
      title = Titleref.current.value;
      const newArr = [...pre];
      const localjobs = JSON.stringify(newArr);
      localStorage.setItem("jobs", localjobs);
      return newArr;
    });
  };
  const handleDelete = (index) => {
    jobs.splice(index, 1);
    setJobs((pre) => [...pre]);
    const localjobs = JSON.stringify(jobs);
    localStorage.setItem("jobs", localjobs);
  };
  const [search, setSearch] = useState("");
  const handleAdd = () => {
    setModal(false);
  };

  return (
    <div>
      <div
        onClick={handleAdd}
        style={{
          fontSize: 30 + "px",
          width: 50 + "px",
          height: 50 + "px",
          backgroundColor: "blue",
          borderRadius: 50 + "%",

          zIndex: 9999,
          position: "absolute",
          right: 9 + "px",
          bottom: 20 + "px",
        }}
      >
        <i
          className="fa-solid fa-plus"
          style={{
            right: 23 + "%",
            position: "absolute",
            top: 20 + "%",
            cursor: "pointer",
          }}
        ></i>
      </div>
      <nav
        style={{
          display: "flex",
          // justifyContent: "center",
          paddingTop: 20 + "px",
          backgroundColor: "cadetblue",
        }}
      >
        <span
          style={{
            fontSize: 24 + "px",
            fontWeight: 800,
            // paddingRight: 587 + "px",
            marginLeft: 15 + "%",
          }}
          className="col-lg-4"
        >
          TODO DM
        </span>
        <div
          className="d-flex"
          style={{
            paddingLeft: 16 + "%",
          }}
        >
          <div
            className="form-outline mb-4"
            style={{
              paddingRight: 28 + "px",
            }}
          >
            <input
              value={search || ""}
              className="form-control "
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
          </div>

          <div>
            <select
              className="form-control"
              onChange={(e) => setNewCate2(e.target.value)}
            >
              {/* {category2.map((cate, index) => {
              return <option key={index}>{cate}</option>;
            })} */}
              <option className="form-control" value="High">
                High
              </option>
              <option className="form-control" value="Medium">
                Medium
              </option>
              <option className="form-control" value="Low">
                Low
              </option>
              <option className="form-control" value="">
                Không
              </option>
            </select>
          </div>
        </div>
      </nav>

      {/* <input
        value={job1.title || ""}
        onChange={(e) => setJob({ ...nd, title: e.target.value })}
      />
      <input
        value={job1.nd || ""}
        onChange={(e) => setJob({ ...nd, nd: e.target.value })}
      /> */}
      <div
        className="container-fluid"
        style={{
          top: 0 + "px",
        }}
      >
        <div
          className="row"
          style={{
            paddingLeft: 15 + "%",
            paddingTop: 43 + "px",
          }}
        >
          {jobs

            .filter((job) => job.title.toLowerCase().includes(search))
            .filter((job) =>
              job.category.includes(categorynew2 ? categorynew2 : "")
            )

            .map((job, index) => (
              <div
                key={job.jobid}
                className="card text-white   mb-3 ml-3 col-xl-4"
                style={{
                  maxWidth: 22 + "rem",
                  backgroundColor:
                    job.category === "High"
                      ? "red"
                      : job.category === "Medium"
                      ? "blue"
                      : "#7CFC00",
                }}
              >
                <div className="card-header ">{job.title}</div>
                <div className="card-body">
                  <h5 className="card-title">{job.category}</h5>
                  <p className="card-text">{job.nd}</p>
                </div>
                <div
                  className="d-flex pb-3"
                  style={{ justifyContent: "space-around" }}
                >
                  <button
                    className="btn btn-primary"
                    style={{
                      maxWidth: 15 + "rem",
                    }}
                    onClick={() => {
                      handleEdit(
                        job.title,
                        job.nd,
                        job.jobid,
                        index,
                        job.category
                      );
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDelete(index)}
                    style={{
                      maxWidth: 7 + "rem",
                    }}
                  >
                    delete
                  </button>
                  {/* <button
                    className="btn-info"
                    onClick={() => handleSave(job.jobid, index)}
                    style={{
                      maxWidth: 7 + "rem",
                    }}
                  >
                    Lưu sửa
                  </button> */}
                </div>
              </div>
            ))}
        </div>
      </div>
      {modal ? (
        modal
      ) : (
        <div
          style={{
            width: 100 + "%",
            height: 100 + "%",
            zIndex: 500,

            position: "absolute",

            backgroundColor: "rgba(0,0,0,0.4)",
            top: 0,
          }}
          className="overlay"
        >
          <form
            style={{
              marginTop: 8 + "%",
              marginLeft: 30 + "%",
              backgroundColor: "cyan",
              width: 40 + "%",
              borderRadius: 12 + "px",
              position: "relative",
            }}
          >
            <div
              style={{
                right: 0 + "px",
                position: "absolute",
                fontSize: 27 + "px",
                cursor: "pointer",
                width: 41 + "px",
                borderRadius: 50 + "%",
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
              onClick={() => setModal(true)}
            >
              <i
                className="fa-solid fa-xmark"
                style={{
                  right: -12 + "px",
                  /* position: absolute; */
                  position: "relative",
                }}
              ></i>
            </div>
            <div className="form-group">
              <label
                htmlFor="TieuDe"
                style={{
                  marginLeft: 14 + "%",
                  marginTop: 20 + "px",
                }}
              >
                Tiêu Đề
              </label>
              <input
                value={title}
                className="form-control form-control-lg"
                ref={ref}
                style={{
                  width: 70 + "%",
                  marginLeft: 14 + "%",
                }}
                placeholder="Nhập tiêu đề ..."
                onChange={(e) => setJob({ ...nd, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="Noidung"
                style={{
                  marginLeft: 14 + "%",
                }}
              >
                Nội dung
              </label>
              <textarea
                value={nd || ""}
                rows="5"
                style={{
                  width: 70 + "%",
                  marginLeft: 14 + "%",
                }}
                className="form-control form-control-lg"
                placeholder="Nhập Nội dung ..."
                ref={Titleref}
                onChange={(e) => setJob({ ...title, nd: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="Chon"
                style={{
                  marginLeft: 14 + "%",
                }}
              >
                Loại
              </label>{" "}
              <select
                className="form-control form-control-lg"
                style={{
                  width: 70 + "%",
                  marginLeft: 14 + "%",
                }}
                onChange={(e) => setNewCate(e.target.value)}
                value={category}
              >
                {/* {category2.map((cate, index) => {
              return <option key={index}>{cate}</option>;
            })} */}
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleSave()}
              style={{
                maxWidth: 7 + "rem",

                marginLeft: 85 + "px",
                marginBottom: 20 + "px",
              }}
            >
              Lưu sửa
            </button>
            <button
              className="btn btn-primary"
              style={{
                width: 49 + "%",
                cursor: "pointer",
                marginBottom: 20 + "px",

                marginLeft: 6 + "%",
              }}
              ref={editbutton}
              onClick={handleSub}
            >
              Lưu
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
