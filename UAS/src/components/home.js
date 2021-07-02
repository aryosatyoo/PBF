import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";
import "./home.css";
import Carousel from 'react-bootstrap/Carousel'
import backgroundas from '../backgroundas.jpg';
import firebase from 'firebase';
import firebaseconfig from '../firebase/firebase.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

class Home extends Component {
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    };
    render() {
        const { isLoggingOut, logoutError } = this.props;

        return (
            <Router>
                <div>

                    <header>
                        <img src="data:image/png;base64,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" className="logo" />
                        <nav>
                            <ul className="navlink">

                                <li><a><Link to="/">Dashboard</Link></a></li>
                                <li><a><Link to="/TambahDTW">Update Data Barang</Link></a></li>
                                <li><a><Link to="/Barang">Data Barang</Link></a></li>
                                <li>
                                    <button onClick={this.handleLogout}>Logout</button>
                                    {isLoggingOut && <p>Logging Out....</p>}
                                    {logoutError && <p>Error logging out</p>}
                                </li>
                            </ul>
                        </nav>
                    </header>


                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/TambahDTW">
                            <TambahDTW />
                        </Route>
                        <Route path="/Barang">
                            <Barang />
                        </Route>

                    </Switch>


                </div>
            </Router>
        );

        function Home() {
            return (
                <div>
                    <div id="slider">
                        <div id="slider-wrapper">
                            <div class="slide">
                                <img src="https://www.apple.com/v/iphone-xr/e/images/meta/og__ckc4vfw7h7ki_specs.png?202011192319" alt="1" />
                                <p class="caption">Caption 1</p>
                            </div>
                            <div class="slide">
                                <img src="http://lorempixel.com/960/300/business" alt="2" />
                                <p class="caption">Caption 2</p>
                            </div>
                            <div class="slide">
                                <img src="http://lorempixel.com/960/300/animals" alt="" />
                                <p class="caption">Caption 3</p>
                            </div>
                            <div class="slide">
                                <img src="http://lorempixel.com/960/300/food" alt="" />
                                <p class="caption">Caption 4</p>
                            </div>
                            <div class="slide">
                                <img src="http://lorempixel.com/960/300/nature" alt="" />
                                <p class="caption">Caption 5</p>
                            </div>
                        </div>
                        <div id="slider-nav">
                            <a href="#" data-slide="0">1</a>
                            <a href="#" data-slide="1">2</a>
                            <a href="#" data-slide="2">3</a>
                            <a href="#" data-slide="3">4</a>
                            <a href="#" data-slide="4">5</a>
                        </div>
                    </div>
                </div>
            );
        }
    }
}



function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError
    };



} export default connect(mapStateToProps)(Home);

class TambahDTW extends Component {

    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseconfig);
        }
        else {
            firebase.app();
        }

        this.state = {
            id: '',
            nama: '',
            tempat: '',
            kondisi: false,
            dataDTW: []
        }
    }


    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    tambahData = () => {
        if (this.state.kondisi === false) {
            firebase.database().ref('DTW').push({
                nama: this.state.nama,
                tempat: this.state.tempat
            })
            this.setState({
                id: '',
                nama: '',
                tempat: ''
            })
            alert('Data Berhasil Ditambahkan');
        } else {
            firebase.database().ref('DTW/' + this.state.id).set({
                nama: this.state.nama,
                tempat: this.state.tempat
            })
            this.setState({
                id: '',
                nama: '',
                tempat: '',
                kondisi: false
            })
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        firebase.database().ref('DTW')
            .on('value', (snapshot) => {
                let NewData = [];
                snapshot.forEach(data => {
                    const dataVal = data.val();
                    NewData.push({
                        id: data.key,
                        nama: dataVal.nama,
                        tempat: dataVal.tempat
                    })
                })
                this.setState({
                    dataDTW: NewData
                })
            })
        console.log(this.state.dataDTW);
    }

    hapusData = (id) => {
        firebase.database().ref('DTW/' + id).remove();
    }

    updateData = (update) => {
        firebase.database().ref('DTW/' + update)
            .on('value', (snapshot) => {
                const data = snapshot.val();
                this.setState({
                    id: snapshot.key,
                    nama: data.nama,
                    tempat: data.tempat,
                    kondisi: true
                })
            })
    }

    render() {
        return (
            <div className="bungkus">
                <div className="form">
                    <div className="form-input">
                        <div>
                            <h3>Tambahkan <br />Stock Barang<br /></h3>
                            <br />
                            <label>Nama Barang:</label>
                            <br />
                            <input type="text" id="nama" name="nama" onChange={this.handleOnChange} value={this.state.nama} />
                            <br /><br />
                            <label>Stok Barang:</label>
                            <br />
                            <input type="text" id="tempat" name="tempat" onChange={this.handleOnChange} value={this.state.tempat} />
                            <br /><br /><br />
                            <button onClick={this.tambahData}>Simpan</button>
                        </div>
                        <div className="logo">
                            <img src="data:image/png;base64,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" />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

<br />
const Post = (data) => {
    return (
        <div className="bungkus-data">
            <div className="form">
                <div className="form-input">
                    <div className="data-img">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAn1BMVEX///8aGRlDptsAAADCwsIUExPMzMwGAwM3Nzd7eno2otm33PAQDw+83fHa2toWFRVRUVH29vbQ0NAKCAhCQkLt7e0woNnm5uaQkJBpaWmJiYnf399/f38uLi6qqqrW1tbz+v24uLheXl5oZ2eYmJglJSV4veSnp6dycnLe7/hKSUno9fuLxufS6fal0uyFw+ZmtuFVrt5YWFim0+w7Ozs7QBt8AAAIS0lEQVR4nO2ae3OqPBDG0XileEEFrYqlWnuoWqv2fP/P9kICkstyqefMmXlnnt9fjgmQh93sbhIsCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4H+C63nDluf/sed/N6+X08a+e5rbW4z3jBLdl5588M7SbTdu/PpX1GUZ9maXaOu9sFst1f714e22tSp/V2jLWdUYNzsiJZUaTe+NbX2OtXvwqDSL6kcRLM8G2SwzZYV0JFkhNk6UwSfI/Z7vxivQFzGloTNkh0zhRHpLc71W+es5YQUtNhYkhL4NChfKo2r1c34yxtjLkxDJrSuNwrPVMcdgu7b7V9EvPiZnlrWz3I4GJl2b4zfPxBwrdvmmURCRjv4xbLMiunC7b8C4vTGuQTfWWN7YbP4tSJ0lhYsj3z7oKvZ4+pFyjNlHccVFX0f2Z97oVG3EoXc9aPxJ49psa/qmmwv20eNDsTb7e23dLBCbdZ0m3EiMGuYczLQKVE77busDYjvUURuVmmeeXu0HJu0iHPU46jnUjZjFtzcz/SI6qCx7PTUJgTRsOywTGk0vy00OFBbnEpP+kwIjy89lLmcKr7TdPg8+P0Ao/Ps8XmzKgTWRGSmFUYRd2Dwelxs77J35Nz0R3L/nookygdfITCT6Hkhcb8CvkPQeKsQmFLhtVjDjLc6+1BArjmEZMosou/9f5XSowHvjVJ4Vl+q5C2MC+hqpCR6IbGKKpAYsUYHlVryKjvY97bzXPSBRJr2jEyoumhI8vau4JB20KB/24+Ff1opfZWGZrWmbkTKdqQmdpbRfVmITpFW9UOG3J3kIkWoLwiTZk6qDhKXbgsPwWhkKncYieA+WvrgjqREBqi/LONG0ydY3C5rDLzTq9lY7p225+paXn57uh0U4d9Ck2pa8nfXeosNIVOjzWy3XHXeGzHpDaLHhrrVatRcPQSBqxnUsesaKSl/Phy6Vn+H2VU30WQT+vyUrDSBcdprDXFU5FTaLkM5GYjVnI9veK5NXR1POZqIdT+drygvvJTifbd5gZMguntn/i/x3fhWrjWiKWkgplI4qq5pdmkrQ+E7g3vbVDGDFvrSi4nzK/tJuntLw+nuME6Tev6brpLBQTCbGuQtklRfV4UC3S3ao3nmnNid2LjFhZcD/lM08qr4/HYyh+DbIYezWvralQ6cbnjKtFXH2QmhO3k2xn5ETlldVTyDOfaqk4Q2Tyv3+ucLR/Xi8WWyX4zMwLiYmkeTF/LbQRqwvuJy16xpMvXwue8rBDZYoqhY3RNF7hKwMTYt7UC4mCpKEYkduJnInlBTepkDtrqkZeYbwT1xIKW+U1TTqgvpLuqXy9ZGYPvbDhLcMHFCZBh0v8lhIHVXg/oDCt2XbKWKllgXofUVcTRqwouAsVNu2vpEmZoNR+1I8VjtoipKgLPkYEw7laCPX5n8ZMFLP6EYV81g3kFp+69gEv3RPJooZCsao0q9M6O6sFCgfaTg2RKx5RGBdnSex70IaGEZ3ygrRK4ZfccvlLCkVRo81DIlp0iHlIGbF0Zf9vFI70OnoUm6w6li6IWGqZRpxuzUsfVFjXS9W/pnE5vtcyYpIS1XxIxYu9mQ/NJzYezhaEwrqRRvlrGvFlzWSmOOU0Mmoao/DaEDVNgr7rVseINRXa1M5+lcJsPW/15HV+e6bXpe1AizXabs99C1hfktQyYrFCdc+UctPaChWTjPauvnjQ98JvavWShdI5EcaqjViiUP2HFwGWcn5BKJyQCtUYGPucsT5U6md9nzFLezOq9q40YrYCtm3dKVWFyfrx+3T5ekihuvJh83h5pI9zdh9oJ9AaRw3RsCAzUaURuUL/choMztIuDaGQvwVRsP5YobqxluzsG1W0w26vq/l8uDkYp21pNixcIFYYkSvMdmnuZQypMEatTgmFij92hUKvr0XGOTlcR+z2mJ6YRtKAPGesNmKs0M7H/XG1S2x41U4RqxQ2GrPxdjtj+rRKTmeopRBN6gn9AhPGHcq3gwfaicTFLlLoG0vEaoVtx3GMV88VzmvveY94KikpB6fyNpY1XI/HfTnBhraWB7hEQqFfayeq4uhJKOReR+Q2ujcfrTvNX4jxzmQjRrsXN1Y5kzLslz7yK6XQbhILxMcUZhsPu1oSUx/d5bHKuR00iZIRo401X61cqyPtjIT6Ef2HLRReZIHZxkaVwlX1sO+5r1e8yZt3FmFEOYXxDI+9G7ETWctxPwri0veNGHDG2dYV+mey44MKs+juNSolToUpPMlHk72s3/oSIzPizbOS7428veXuSxRamg3tJvGVwsMKu7lLzbsVErv7dNcjD7xd4oQrN+LBspYbb9WPy7xtWYR9smWF9iUs6EcopEpHBUde0Xt6+aKNeyz6SkGp7fC/9Nx4PyGJK59DxE8OtqWFgGzDAg99UCFrq682or8XEu8iXdnL90wXWkVGjIcQe+k8STCz0gOps58rLPDQhxQ67Fl/bqdHJ8Y2O2RGkD97yqKUbsR0r2r5ai3jd/BrZ70cygRax0yhfSE/hnpEYTte8B8mxF02jmlHhwX3nX6p4M53uE0j8s9Y3MBtJS9m4fUqdnCuIh8SX5ioCo3zQ48VEUSbecF9Nj3G8sNw/ipe6YfkcyvQ7y/O2F4avIvXqzr3PodxPedfiz7ZS/FaCskqzm0RdCbDInEp81+7+5B7kfIZY0e6keQCK+Mp6Z1u7fUyCOp9ohrW6vXXcIeTWMPqjz8S9jqtivcJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAH/If/ciX4cF6OKIAAAAASUVORK5CYII=" className="logo" />
                    </div><br />
                    <div className="data-content">
                        <h2>Nama Barang :</h2>
                        <h3>{data.nama}</h3>
                        <br />
                        <h2>Stok Barang: </h2>
                        <h3>{data.tempat}</h3>
                        <br />
                        <button onClick={() => data.hapusData(data.id)}>Hapus</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

class Barang extends TambahDTW {
    render() {
        return (
           
               
                    <div className="form-input">
                            {this.state.dataDTW.map(dtw => {
                                return (
                                    <Post
                                        id={dtw.id}
                                        nama={dtw.nama}
                                        tempat={dtw.tempat}
                                        hapusData={this.hapusData}
                                        updateData={this.updateData}
                                    />
                                )
                            })}
                        </div>
        )
    }
}